import { useState } from 'react';
import { Button, Icon, Image, Input, Spinner } from '@chakra-ui/react';
import useCreateReply from '@/hooks/useCreateReply';
import useReplyStore from './StoreState/replyStore';
import Swal from 'sweetalert2';
import { LuImagePlus } from 'react-icons/lu';

interface CreateReplyProps {
  threadId: string;
}

const CreateReply = ({ threadId }: CreateReplyProps) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [replyContent, setReplyContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { handleCreateReply } = useCreateReply();
  const addReply = useReplyStore((state) => state.addReply);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please upload a valid image file (JPG, PNG, GIF)',
        });
        return;
      }
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!replyContent.trim() && !imageFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Reply',
        text: 'Please add some text or an image to reply',
      });
      return;
    }

    setIsUploading(true);

    try {
      const result = await handleCreateReply(
        threadId,
        replyContent,
        imageFile || undefined
      );

      if (result) {
        addReply(result.reply);
        setReplyContent('');
        setImageFile(null);

        Swal.fire({
          icon: 'success',
          title: 'Reply Posted',
          text: 'Your reply has been posted successfully!',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Reply submission error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'There was an error posting your reply. Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="px-5 py-5">
      <div className="flex justify-center items-center gap-5">
        <Image
          borderWidth={3}
          borderColor={'blackAlpha.600'}
          src={
            user.avatarUrl ||
            `https://ui-avatars.com/api/?name=${user.fullname}&background=27272a&rounded=true&size=60&color=ffffff`
          }
          boxSize={'50px'}
          borderRadius="full"
          fit="cover"
        />
        <Input
          placeholder="Type your reply!"
          variant="flushed"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          disabled={isUploading}
        />
        <div>
          <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
            <Icon size="2xl" w="10" color="green.500">
              <LuImagePlus />
            </Icon>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
        <Button
          bg="green.500"
          rounded={20}
          px={5}
          onClick={handleSubmit}
          disabled={isUploading}
        >
          {isUploading ? <Spinner size="sm" /> : 'Post'}
        </Button>
      </div>
    </div>
  );
};

export default CreateReply;
