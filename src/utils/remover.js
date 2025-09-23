import fs from "fs";

export const removeFile = async (filePath) => {
    try {
        if(fs.existsSync(filePath)){
            await fs.promises.unlink(filePath);
            console.log("Archivo eliminado:", filePath);
        }
        else{
            console.log("El archivo no existe:", filePath);
        }
    } catch (error) {
        console.error("Error al eliminar el archivo:", error);
    }
}