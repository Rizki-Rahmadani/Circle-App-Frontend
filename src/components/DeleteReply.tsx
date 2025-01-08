import { apiURL } from '@/utils/baseurl';

interface DeleteReplyProps {
  replyId: number;
  currentUserId: number;
  authorId: number; // Pemilik reply
  threadAuthorId: number; // Pemilik thread
  onReplyDeleted: () => void;
}

function DeleteReply({
  replyId,
  currentUserId,
  authorId,
  threadAuthorId,
  onReplyDeleted,
}: DeleteReplyProps) {
  const isAuthorized =
    currentUserId === authorId || currentUserId === threadAuthorId;

  if (!isAuthorized) {
    return null; // Tidak menampilkan tombol delete jika pengguna tidak berwenang
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(apiURL + `/thread/reply/${replyId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error deleting reply:', error);
        return;
      }

      console.log('DeleteReply Debug:', {
        currentUserId,
        authorId,
        threadAuthorId,
        isAuthorized:
          currentUserId === authorId || currentUserId === threadAuthorId,
      });

      onReplyDeleted(); // Callback untuk refresh daftar reply
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500">
      Delete
    </button>
  );
}

export default DeleteReply;
