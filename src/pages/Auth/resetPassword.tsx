import { Button, Input, Stack } from "@chakra-ui/react";

type ResetPasswordProps = {
  logo: string;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ logo }) => {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <div>
        <h1 className="text-green-500 text-4xl font-bold">{logo}</h1>
        <h1>Reset Password</h1>
        <Stack gap="4" width={300} py={3}>
          <Input placeholder="New Password" variant="subtle" />
          <Input placeholder="Confirm New Password" variant="subtle" />
          <Button className="bg-green-500" rounded={20}>
            Create New Password
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default ResetPassword;
