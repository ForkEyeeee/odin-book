import { createPost } from '@/app/lib/actions';

export const handleCreatePost = async (postText: string, file: File | null): Promise<any> => {
  const formData = new FormData();
  formData.append('post', postText);

  if (file) {
    const imageFormData = new FormData();
    imageFormData.append('file', file);
    imageFormData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`);

    try {
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
        { method: 'POST', body: imageFormData }
      );
      const uploadedImageData = await uploadResponse.json();
      formData.append('image-url', uploadedImageData.secure_url);
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('Post upload failed');
    }
  } else {
    formData.append('image-url', '');
  }

  return await createPost(postText, formData);
};
