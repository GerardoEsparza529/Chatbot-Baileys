import { downloadMediaMessage } from "@whiskeysockets/baileys";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const formats = {
    mp3: {
        codec: "libmp3lame",
        ext: "mp3",
    },
}

const converAudio = async (filePath, format = "mp3") => {
    if (!filePath){
        throw new Error("No se proporcionó filePath para la conversión.");
    }

    const convertedFilePath = path.join(
        path.dirname(filePath),
        `${path.basename(filePath, path.extname(filePath))}.${formats[format].ext}`
    );

    await new Promise((resolve, reject) => {
        ffmpeg(filePath)
            .audioCodec(formats[format].codec)
            .audioBitrate("128k")
            .format(formats[format].ext)
            .output(convertedFilePath)
            .on("end", resolve)
            .on("error", reject)
            .run();
    });
    return convertedFilePath;

};

export const downloadFile = async (url, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(url, {
        method: "GET",
        headers,
    });
    if (!res.ok) {
        throw new Error ( `Failed to fetch ${url}: ${res.statusText}`);
    }


    const urlExtension = path.extname (url).slice(1);
    const mimeType = res.headers.get("content-type");
    const extension = mime.extension (mimeType) || urlExtension || "bin";


    const fileName = `file-${Date.now()}.${extension}`;
    const folderPath = path.join(process.cwd(), "public");
    const filePath = path.join(folderPath, fileName);

    if (!fs.existsSync (folderPath)) {
        fs.mkdirSync (folderPath, { recursive: true });
    }


    const fileStream = fs.createWriteStream (filePath);
    await new Promise((resolve, reject) => {
        res.body.pipe(fileStream);
        res.body.on("error", (err) => {
            reject(err);
        });
        fileStream.on("finish", function () {
            resolve();
        });
    });

    console.log("Archivo descargado en:", filePath);

    const audioExtensions = ["oga", "mp3", "wav", "ogg"];
    let finalFilePath = filePath;
    let finalExtension = extension;

    if(audioExtensions.includes(finalExtension)){
        try {
            finalFilePath = await converAudio(finalFilePath, "mp3");
            finalExtension = "mp3";
            console.log("Archivo convertido a:", finalFilePath);
        } catch (error) {
            console.error("Error al convertir el archivo:", error);
        }
    }

    return {
        fileName: path.basename(finalFilePath),
        fileOldPath: filePath,
        filePath: finalFilePath,
        fileBuffer: fs.readFileSync(finalFilePath),
        fileExtension: finalExtension,
    };
};

export const downloadFileBaileys = async (ctx) => {
    try {
        const buffer = await downloadMediaMessage(ctx, "buffer");

        const tmpDir = path.join(process.cwd(), "public");
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }

        const fileName = `file_${Date.now()}.ogg`;
        const filePath = path.join(tmpDir, fileName);
        fs.writeFileSync(filePath, buffer);

        console.log("Archivo descargado en:", filePath);

        // Convertir a mp3
        const audioExtensions = ["oga", "mp3", "wav", "ogg"];
        let finalFilePath = filePath;
        let finalExtension = "ogg"; // Extensión por defecto

        if (audioExtensions.includes(finalExtension)) {
            try {
                finalFilePath = await converAudio(finalFilePath, "mp3");
                finalExtension = "mp3";
                console.log("Archivo convertido a:", finalFilePath);
            } catch (error) {
                console.error("Error al convertir el archivo:", error);
                // Si falla la conversión, usar el archivo original
                finalFilePath = filePath;
                finalExtension = "ogg";
            }
        }

        return {
            fileName: path.basename(finalFilePath),
            fileOldPath: filePath,
            filePath: finalFilePath,
            fileBuffer: fs.readFileSync(finalFilePath),
            extension: finalExtension,
        };
    } catch (error) {
        console.error("Error en downloadFileBaileys:", error);
        throw new Error("No se pudo descargar el archivo de audio.");
    }
};

export default {
    downloadFile,
    downloadFileBaileys,
};