export interface NotificationPayload {
  orchestra: string;
  instrument: string;
  position: string;
  createdAt: string;
  proofImage: string;
}

export const notifyAdmin = (payload: NotificationPayload) => {
  // Simulate an email notification sent to the admin backend
  console.group('📧 [SIMULATED EMAIL SYSTEM] New Review Submitted');
  console.log('To: admin@orchestra-auditions.com');
  console.log(`Subject: New Pending Review - ${payload.instrument} (${payload.orchestra})`);
  console.table({
    Orchestra: payload.orchestra,
    Instrument: payload.instrument,
    Position: payload.position,
    'Submission Date': new Date(payload.createdAt).toLocaleString(),
    'File Attached': payload.proofImage || 'None',
  });
  console.log('Action Required: Log in to Admin Panel to Verify.');
  console.groupEnd();
};
