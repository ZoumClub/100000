"use client";

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type AvailabilityStatus = 'available' | 'sold';
export type CarType = 'new' | 'used';

export interface CarStatus {
  approval_status: ApprovalStatus;
  availability_status: AvailabilityStatus;
}