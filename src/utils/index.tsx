export const downloadFile = async (fileUrl : string) => {
    try {
        const response = await fetch(fileUrl,{method:"GET"});
        if (!response.ok) throw new Error("File download failed");

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = downloadUrl;
        link.download = fileUrl.split("/").pop() || "file";
        link.click();

        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error("Download failed:",error);
    }
};