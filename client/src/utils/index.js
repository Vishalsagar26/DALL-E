import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants'

export function getRandomPrompt(prompt) {
    //genertate random index according with its length
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

    //using randomindex generate random prompt 
    const randomPrompt = surpriseMePrompts[randomIndex];

    //the prompt should not repeat so the check condition is applied here
    if (randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}