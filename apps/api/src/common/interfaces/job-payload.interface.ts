/**
 * Every job payload must include the tenantId to ensure strict tenant isolation
 * during background processing in BullMQ workers.
 */
export interface JobPayload {
  tenantId: string;
}

/**
 * Example extended job payload:
 *
 * export interface ProcessOrderJob extends JobPayload {
 *   orderId: string;
 * }
 */
