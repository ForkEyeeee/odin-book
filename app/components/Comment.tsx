import { VStack } from '@chakra-ui/react';
import CommentItem from './CommentItem';
import { CommentProps } from '../lib/definitions';

export default function Comment({ comments, post, userId, handleDeleteComment }: CommentProps) {
  return (
    <VStack spacing={4} align="stretch" p={4} borderRadius={5}>
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          post={post}
          userId={userId}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </VStack>
  );
}
