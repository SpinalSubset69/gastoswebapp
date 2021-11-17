import fs from 'fs';
import path from 'path';
import { InvalidData, NotFound } from './errors';

const CURRENT_WORKING_DIR = process.cwd();

export const handleFile = (file) =>{
    //Get file typ
    const fileType = file.name.split('.')[1];    

    //Verify if file type matches any of admitted type
    if(!fileType.includes('jpg') && !fileType.includes('jpeg') && !fileType.includes('png')){
        fs.unlink(file.path, (err) =>{
            console.log(err);
        });
        throw new InvalidData('Just can upload images');
      }    
}

export const getFileName = (filePath) => {
    return filePath.split('/')[8];
}

export const getImage = (imageName) => {
    const path_img = path.join(CURRENT_WORKING_DIR, `/server/upload/images/${imageName}`);

    const imageExists = fs.existsSync(path_img);

    if(!imageExists){
        throw new NotFound('Image');
    }

    return path.resolve(path_img);
}