import { Router } from 'express';
import { sendWhatsAppAlert } from '../services/sendAlert.js';

const router = Router();

router.post('/daily-update', async (_req, res) => {
  try {
    const result = await sendWhatsAppAlert();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// router.post('/attendance-update', async (_req, res) => {
//   try {
//     const result = await sendWhatsAppAlert();
//     res.status(200).json({ success: true, data: result });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

export default router;
