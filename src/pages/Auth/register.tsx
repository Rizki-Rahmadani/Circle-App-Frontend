import RegisterForm from '@/components/RegisterForm';

const Register = () => {
  return (
    // <div className="flex flex-col justify-center items-center py-10">
    //   <div className="">
    //     <h1 className="text-green-500 text-4xl font-bold">{logo}</h1>
    //     <h1>Create accout Circle</h1>
    //     <form onSubmit={handleSubmit} className="pt-3">
    //       <Stack gap="4" width={300}>
    //         <Input
    //           placeholder="Username"
    //           variant="subtle"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //         />
    //         <Input
    //           placeholder="Email"
    //           variant="subtle"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <Input
    //           placeholder="Password"
    //           variant="subtle"
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <Button type="submit" className="bg-green-500" rounded={20}>
    //           Create
    //         </Button>
    //       </Stack>
    //       <p className="text-sm">
    //         Already have account?
    //         <Link to="/login" className="text-green-500">
    //           Login
    //         </Link>
    //       </p>
    //     </form>
    //   </div>
    // </div>
    <div>
      <RegisterForm logo="circle" />
    </div>
  );
};

export default Register;
