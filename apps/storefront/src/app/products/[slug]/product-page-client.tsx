"use client";

import { useState, useMemo } from "react";
import { SectionRenderer } from "@/components/section-renderer";

export function ProductPageClient({ nodes, initialProduct }: { nodes: any[], initialProduct: any }) {
  const optionsMap = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    initialProduct.variants?.forEach((v: any) => {
      if (v.attributes_json) {
        Object.entries(v.attributes_json).forEach(([key, value]) => {
          if (!map[key]) map[key] = new Set();
          map[key].add(value as string);
        });
      }
    });
    return map;
  }, [initialProduct.variants]);

  const defaultSelections = useMemo(() => {
    const selections: Record<string, string> = {};
    Object.entries(optionsMap).forEach(([key, set]) => {
      selections[key] = Array.from(set)[0];
    });
    return selections;
  }, [optionsMap]);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(defaultSelections);

  const selectedVariant = useMemo(() => {
    if (!initialProduct.variants || initialProduct.variants.length === 0) return null;
    return initialProduct.variants.find((v: any) => {
      if (!v.attributes_json) return Object.keys(selectedOptions).length === 0;
      return Object.entries(selectedOptions).every(([k, val]) => v.attributes_json[k] === val);
    }) || initialProduct.variants[0];
  }, [initialProduct.variants, selectedOptions]);

  const handleOptionSelect = (key: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [key]: value }));
  };

  const dynamicProduct = {
    ...initialProduct,
    selectedVariant,
    selectedOptions,
    handleOptionSelect,
  };

  return <SectionRenderer nodes={nodes} dataContext={{ product: dynamicProduct }} />;
}
