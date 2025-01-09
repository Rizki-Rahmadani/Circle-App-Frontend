import { Button, IconButton, Textarea, Input, Image } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/menu';
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@/components/ui/dialog';
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { deleteThread } from '@/features/dashboard/services/thread.services';
import { useState, useEffect } from 'react';
import useThreadStore from '@/components/StoreState/useThreadStore';
import { LuImagePlus, LuX } from 'react-icons/lu';
import Swal from 'sweetalert2';

interface ThreadOptionsProps {
  threadId: number;
  authorId: number;
  currentUserId: number;
  content: string;
  image?: string; // Add image prop
  onThreadDeleted: () => void;
  onThreadUpdated: (newContent: string, newImage?: File) => void; // Update to include image
}

const ThreadOptions = ({
  threadId,
  authorId,
  currentUserId,
  content,
  onThreadDeleted,
  onThreadUpdated,
}: ThreadOptionsProps) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const updateThread = useThreadStore((state) => state.updatedThread);
  const threads = useThreadStore((state) => state.threads);

  useEffect(() => {
    const currentThread = threads.find((thread) => thread.id === threadId);
    if (currentThread) {
      setImagePreview(currentThread.image ? currentThread.image : null); // Set preview for the old image from the store
    }
  }, [threadId, threads]);

  const handleEdit = async () => {
    try {
      // Tampilkan dialog loading
      Swal.fire({
        title: 'Updating Thread...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          document
            .querySelector('.swal2-container')
            ?.setAttribute('style', 'z-index: 99999 !important');
        },
      });

      await updateThread(threadId, newContent, newImage || undefined);
      onThreadUpdated(newContent, newImage || undefined);
      setEditDialogOpen(false);

      // Tampilkan notifikasi sukses
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Updated successfully',
      });
      // Setelah sukses, tutup dialog
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating thread:', error);
      // Tampilkan notifikasi error
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update thread. Please try again.',
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteThread(threadId);
      onThreadDeleted();
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file)); // Set preview for the new image
    }
  };

  const handleCancelImage = () => {
    setNewImage(null);
    setImagePreview(null); // Clear the image preview
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Thread options"
          variant="ghost"
          size="sm"
          color={'white'}
        >
          <BsThreeDots />
        </MenuButton>
        <MenuList bg="whitesmoke" p={3} borderRadius={4}>
          {currentUserId === authorId && (
            <>
              <MenuItem
                icon={<FiEdit2 />}
                onClick={() => setEditDialogOpen(true)}
                _hover={{ bg: 'whiteAlpha.700' }}
              >
                Edit
              </MenuItem>
              <MenuItem
                icon={<FiTrash2 />}
                onClick={handleDelete}
                _hover={{ bg: 'gray.700' }}
                color="red.400"
              >
                Delete
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>

      <DialogRoot
        open={isEditDialogOpen}
        onOpenChange={(details) => setEditDialogOpen(details.open)}
      >
        <DialogContent bg="black">
          <DialogHeader
            display={'flex'}
            justifyContent={'center'}
            fontSize={'2xl'}
            color={'white'}
          >
            Edit Thread
          </DialogHeader>
          <DialogBody>
            <Textarea
              color={'white'}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Edit your thread content here..."
              size="sm"
            />
            {imagePreview && (
              <div style={{ position: 'relative' }}>
                <Image
                  src={imagePreview}
                  alt="Image Preview"
                  maxWidth="100%"
                  marginTop="10px"
                  marginBottom="10px"
                />
                <IconButton
                  aria-label="Cancel Image"
                  onClick={handleCancelImage}
                  position="absolute"
                  top="5px"
                  right="5px"
                  colorScheme="red"
                >
                  <LuX />
                </IconButton>
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <IconButton
              aria-label="Upload Image"
              onClick={() => document.getElementById('image-upload')?.click()}
              marginTop="10px"
              color={'white'}
            >
              <LuImagePlus />
            </IconButton>
          </DialogBody>
          <DialogFooter>
            <Button
              colorScheme="blue"
              bg={'green.500'}
              p={5}
              onClick={handleEdit}
            >
              Save
            </Button>
            <Button
              variant="ghost"
              bg={'red.500'}
              p={5}
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default ThreadOptions;
