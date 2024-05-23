import "../hboictcloud-config";
import {v4 as uuidv4} from 'uuid';

export class FeedbackService {
    public async uploadFeedback(fileInput: string, feedbackText: string): Promise<void> {
        try {
            const feedbackId: string = uuidv4();

            const blob: Blob = this.base64ToBlob(fileInput);
            await this.saveFeedbackRecord(feedbackId, blob, feedbackText);


        } catch (reason) {
            console.error(reason);
        }
    }

    private base64ToBlob(base64: string): Blob {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }

    private async saveFeedbackRecord(feedbackId: string, blob: Blob, feedbackText: string): Promise<void> {
        const formData = new FormData();
        formData.append('id', feedbackId);
        formData.append('image', blob);
        formData.append('feedback', feedbackText);
        formData.append('createdAt', new Date().toISOString());

        const response: Response = await fetch(`${viteConfiguration.API_URL}/feedback/`, {
            method: 'POST',
            body: formData
        });


        if (!response.ok) {
            throw new Error('Failed to save feedback record');
        }

        console.log('Feedback record saved successfully:', await response.json());
    }
}

export default FeedbackService;
