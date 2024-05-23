import "../hboictcloud-config";
import {v4 as uuidv4} from 'uuid';

export class FeedbackService {
    public async uploadFeedback(base64Image: string, feedbackText: string): Promise<void> {
        try {
            const feedbackId: string = uuidv4();

            await this.saveFeedbackRecord(feedbackId, base64Image, feedbackText);

        } catch (reason) {
            console.error(reason);
        }
    }

    private async saveFeedbackRecord(feedbackId: string, base64Image: string, feedbackText: string): Promise<void> {
        const feedbackRecord = {
            id: feedbackId,
            image: base64Image,
            feedback: feedbackText,
            createdAt: new Date().toISOString()
        };


        const response: Response = await fetch(`${viteConfiguration.API_URL}/feedback/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackRecord)
        });

        if (!response.ok) {
            throw new Error('Failed to save feedback record');
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const jsonResponse = await response.json();
            console.log('Feedback record saved successfully:', jsonResponse);
        } else {
            const textResponse = await response.text();
            console.log('Feedback record saved successfully:', textResponse);
        }
    }

    public async getAllFeedback(): Promise<any[]> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}/feedback/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch feedback records');
        }

        return await response.json();
    }
}

export default FeedbackService;
