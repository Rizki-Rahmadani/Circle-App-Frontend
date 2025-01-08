import {
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogCloseTrigger,
} from '@/components/ui/dialog';
import { Image, Button, Icon, Box } from '@chakra-ui/react';
import { LuChevronRight } from 'react-icons/lu';
import { ThreadType } from '@/types/threads.type';
import ReplyComponent from './ReplyComponent';
import StatusImageDialog from './StatusImageDialog';

interface ImageDialogProps {
  threads: ThreadType[];
  threadId: number;
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageDialog: React.FC<ImageDialogProps> = ({
  threadId,
  threads,
  isOpen,
  onClose,
  imageUrl,
}) => {
  const thread = threads.find((t) => t.id === threadId);

  return (
    <DialogRoot size={'cover'} open={isOpen} onOpenChange={onClose}>
      <DialogContent position={'relative'}>
        <DialogCloseTrigger
          borderColor="whiteAlpha.600"
          color="whiteAlpha.600"
          borderRadius="full"
        />

        <Button
          position={'absolute'}
          bg={'whiteAlpha.500'}
          right={'96'}
          top={10}
          marginRight={'96'}
        >
          <Icon>
            <LuChevronRight />
          </Icon>
        </Button>

        <DialogBody pt={8} bg={'blackAlpha.900'}>
          <Box display="flex" flexDirection="row" gap={4}>
            <Box
              flex={1}
              height={'900px'}
              position="relative"
              overflow="hidden"
            >
              <Image
                src={imageUrl}
                width="100%"
                height="100%"
                objectFit="cover"
                objectPosition="center"
              />
            </Box>
            <Box
              width="500px"
              display="flex"
              flexDirection="column"
              borderXWidth="1px"
              borderYWidth="1px"
              borderColor="gray.700"
              height={'900px'}
              overflow="auto"
            >
              <Box borderColor="gray.700">
                <StatusImageDialog />
              </Box>

              <Box flex={1} overflowY="auto">
                <ReplyComponent threadId={thread?.id} />
              </Box>
            </Box>
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default ImageDialog;
