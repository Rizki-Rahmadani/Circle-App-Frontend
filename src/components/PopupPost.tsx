import { Flex, Textarea } from '@chakra-ui/react';
import { Button } from './ui/button';
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from './ui/popover';
import { Avatar } from './ui/avatar';
import { HiMiniPhoto } from 'react-icons/hi2';
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from './ui/file-upload';

const PopUpPost = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button size="sm" width={'xs'}>
          Create Post
        </Button>
      </PopoverTrigger>
      <PopoverContent w={'96'} maxH={'96'}>
        <PopoverArrow />
        <PopoverBody>
          <Flex direction={'column'} gap="4">
            <Flex gap={3}>
              <Avatar />
              <Textarea
                placeholder="What is Happening ?!"
                variant={'flushed'}
                w={'60'}
                pt={3}
              />
            </Flex>
            <Flex borderBottomWidth="1px"></Flex>
            <Flex>
              <div className="flex items-center w-full justify-between">
                <div>
                  <FileUploadRoot>
                    <FileUploadTrigger asChild>
                      <Button variant="outline">
                        <HiMiniPhoto />
                      </Button>
                    </FileUploadTrigger>
                    <FileUploadList />
                  </FileUploadRoot>
                </div>
                <Button>Post</Button>
              </div>
            </Flex>
          </Flex>
        </PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  );
};

export default PopUpPost;
