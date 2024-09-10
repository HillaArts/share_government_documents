// js/document-management/index.js
import { uploadDocument } from "./upload.js";
import { loadDocuments } from "./list.js";
import { updateDocument } from "./update.js";
import { deleteDocument } from "./delete.js";
import { shareDocument } from "./share.js";

// Handle document upload
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = document.getElementById('document-file').files[0];
    if (file) {
        await uploadDocument(file);
        await loadDocuments(); // Refresh the document list
    }
});

// Handle document list actions (update, delete, share)
document.getElementById('document-list').addEventListener('click', async (e) => {
    const target = e.target;
    const docId = target.parentElement.getAttribute('data-doc-id');
    const fileName = target.parentElement.textContent;

    if (target.textContent === 'Update') {
        const newFileName = prompt("Enter the new file name:");
        if (newFileName) await updateDocument(docId, newFileName);
    } else if (target.textContent === 'Delete') {
        await deleteDocument(docId, fileName);
    } else if (target.textContent === 'Share') {
        const shareEmail = prompt("Enter the email to share with:");
        if (shareEmail) await shareDocument(docId, shareEmail);
    }

    await loadDocuments(); // Refresh the document list
});

// Load documents on page load
window.onload = loadDocuments;
