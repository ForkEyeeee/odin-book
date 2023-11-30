import { createPost } from '@/app/lib/actions';

export const handleCreatePost = async (postText: string, file: File | null): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('post', postText);

    const allowedTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];
    console.log('test');
    if (file) {
      if (allowedTypes.includes(file.type)) {
        const imageFormData = new FormData();
        imageFormData.append('file', file);
        imageFormData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`);

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
          { method: 'POST', body: imageFormData }
        );
        const uploadedImageData = await uploadResponse.json();
        formData.append('image-url', uploadedImageData.secure_url);
      } else {
        return { message: 'Please enter a Valid file format', success: false };
      }
    } else {
      formData.append('image-url', '');
    }

    return await createPost(postText, formData);
  } catch (error) {
    throw new Error('Post upload failed');
  }
};
