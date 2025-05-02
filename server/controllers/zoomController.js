import axios from "axios";

export const createZoomMeeting = async (req, res) => {
  const { topic = "New Meeting", start_time, duration = 30 } = req.body;

  try {
    const response = await axios.post(
      `${process.env.ZOOM_API_BASE_URL}/users/${process.env.ZOOM_USER_ID}/meetings`,
      {
        topic,
        type: 2, // Scheduled meeting
        start_time,
        duration,
        timezone: "UTC",
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ZOOM_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(201).json({
      meetingId: response.data.id,
      start_url: response.data.start_url,
      join_url: response.data.join_url,
    });
  } catch (error) {
    console.error("Zoom API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create meeting" });
  }
};
