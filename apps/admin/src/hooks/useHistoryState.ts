import { useState, useCallback } from 'react';

export function useHistoryState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  const [history, setHistory] = useState<T[]>([initialState]);
  const [pointer, setPointer] = useState<number>(0);

  const set = useCallback(
    (valueOrFn: T | ((current: T) => T)) => {
      setState((current) => {
        const nextState =
          typeof valueOrFn === 'function'
            ? (valueOrFn as (current: T) => T)(current)
            : valueOrFn;

        if (JSON.stringify(current) === JSON.stringify(nextState)) {
          return current;
        }

        setHistory((prev) => {
          const nextHistory = [...prev.slice(0, pointer + 1), nextState];
          // Limit history size to 50
          if (nextHistory.length > 50) {
            nextHistory.shift();
            setPointer((p) => p - 1);
          }
          return nextHistory;
        });
        setPointer((p) => Math.min(p + 1, 50));
        return nextState;
      });
    },
    [pointer]
  );

  const undo = useCallback(() => {
    setPointer((p) => {
      const nextPointer = Math.max(0, p - 1);
      setState(history[nextPointer]);
      return nextPointer;
    });
  }, [history]);

  const redo = useCallback(() => {
    setPointer((p) => {
      const nextPointer = Math.min(history.length - 1, p + 1);
      setState(history[nextPointer]);
      return nextPointer;
    });
  }, [history]);

  const canUndo = pointer > 0;
  const canRedo = pointer < history.length - 1;

  // Ability to reset history (e.g. on load from remote)
  const reset = useCallback((newState: T) => {
    setState(newState);
    setHistory([newState]);
    setPointer(0);
  }, []);

  return [state, set, { undo, redo, canUndo, canRedo, reset }] as const;
}
