// CreateThreadDialog.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Textarea,
  Text,
  Icon,
} from '@chakra-ui/react';
import { LuCircleX, LuImagePlus } from 'react-icons/lu';
import Swal from 'sweetalert2'; // SweetAlert2 for notifications
import { ThreadType } from '@/types/threads.type';
import { createThread } from '@/features/dashboard/services/thread.services';

interface CreateThreadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  addThread: (newThread: ThreadType) => void;
}

const CreateThreadDialog: React.FC<CreateThreadDialogProps> = ({
  isOpen,
  onClose,
  user,
  addThread,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [threadContent, setThreadContent] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleCreateThread = async () => {
    if (!threadContent) {
      Swal.fire({
        title: 'Error!',
        text: 'You need to write something!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      // Show loading alert
      Swal.fire({
        title: 'Uploading...',
        text: 'Please wait while we upload your thread and image',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await createThread(
        threadContent,
        imageFile || undefined
      );

      if (response.thread) {
        const newThread: ThreadType = {
          ...response.thread,
          likes: response.thread.likes || [],
          _count: {
            likes: response.thread._count?.likes || 0,
            replies: response.thread._count?.replies || 0,
          },
          replies: response.thread.replies || [],
          isLiked: response.thread.isLiked || false,
          author: {
            id: user?.id || 0,
            fullname: user?.fullname || '',
            username: user?.username || '',
            profile: {
              avatarUrl: user?.avatarUrl,
            },
          },
        };
        addThread(newThread);
      }

      Swal.fire({
        title: 'Thread Created!',
        text: 'Your thread has been successfully created.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Reset the form
      setImageFile(null);
      setImagePreview(null);
      setThreadContent('');
      onClose(); // Close the dialog
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create thread. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <>
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="blackAlpha.600"
          zIndex={5}
          onClick={onClose}
        />
      )}

      {isOpen && (
        <Box
          position="fixed"
          top="30%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="black"
          p={5}
          borderRadius="md"
          boxShadow="md"
          width="90%"
          maxWidth="500px"
          zIndex={10}
        >
          <Text fontSize="lg" color="green.500" fontWeight="bold" mb={3}>
            Create New Thread
          </Text>
          <Textarea
            placeholder="What is happening?!"
            value={threadContent}
            onChange={(e) => setThreadContent(e.target.value)}
          />
          {imagePreview && (
            <Flex
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <Image
                src={imagePreview}
                alt="Preview"
                boxSize="200px"
                objectFit="cover"
                borderRadius="md"
                mt={3}
              />
              <Button
                position="absolute"
                top="-2"
                right="16"
                color="white"
                borderRadius="full"
                size="2xl"
                onClick={() => {
                  setImagePreview(null);
                  setImageFile(null);
                }}
                aria-label="Cancel image preview"
              >
                <LuCircleX />
              </Button>
            </Flex>
          )}

          <Flex justifyContent="space-between" mt={10}>
            <div>
              <label htmlFor="post-upload" style={{ cursor: 'pointer' }}>
                <Icon size="2xl" w="12" color="green.500">
                  <LuImagePlus />
                </Icon>
              </label>
              <input
                id="post-upload"
                type="file"
                accept="image/*"
                style={{
                  display: 'none',
                }}
                onChange={handleFileChange}
              />
            </div>
            <Box spaceX="5">
              <Button bg="green.500" p="4" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                bg="green.500"
                p="5"
                colorScheme="blue"
                onClick={handleCreateThread}
              >
                Post
              </Button>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default CreateThreadDialog;
