import axios from "axios";
import { getZoomAccessToken } from "./getzoomacesstoken.js";

/**
 * Create a recurring Zoom meeting (daily).
 * @param {string} topic - Meeting topic/title.
 * @param {string} startTime - ISO 8601 formatted start time (e.g., "2025-05-04T10:00:00Z").
 * @param {number} duration - Duration in minutes for each occurrence.
 * @param {number} numberOfDays - Total number of recurring days.
 * @returns {Promise<Object>} - Zoom API response with meeting details.
 */
export async function createRecurringZoomMeeting(
  topic,
  startTime,
  duration,
  numberOfDays
) {
  try {
    const accessToken = await getZoomAccessToken();
    const response = await axios.post(
      `${process.env.ZOOM_API_BASE_URL}/users/${process.env.ZOOM_USER_ID}/meetings`,
      {
        topic,
        type: 8, // Recurring meeting with fixed time
        start_time: startTime,
        duration,
        timezone: "UTC",
        recurrence: {
          type: 1, // Daily
          repeat_interval: 1, // Every day
          end_times: numberOfDays,
        },
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          waiting_room: false,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      meetingId: response.data.id,
      startUrl: response.data.start_url,
      joinUrl: response.data.join_url,
      occurrences: response.data.occurrences,
    };
  } catch (error) {
    console.error("Zoom API error:", error.response?.data || error.message);
    throw new Error("Failed to create recurring meeting");
  }
}
