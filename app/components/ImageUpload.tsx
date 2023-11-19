'use server';
import { ImageForm } from './ImageForm';
async function file(formData: FormData) {
  const file = formData.get('file') as File;
  console.log('File name:', file.name, 'size:', file.size);
}

export default async function ImageUpload() {
  return (
    <form action={file}>
      <label htmlFor="file">Photo</label>
      <input type="file" name="file" id="file" />
      <button type="submit" id="upload">
        Upload file
      </button>
    </form>
  );
}
