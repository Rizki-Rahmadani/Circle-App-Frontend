type Person = {
  name: string;
  age: number;
  logo: string;
};

const Greeting: React.FC<Person> = ({ name, age, logo }) => {
  return (
    <div>
      <p className="bg-red-200	">Hello, Nama saya adalah {name}</p>
      <p>
        Saya berumur {age} {logo} Tahun
      </p>
    </div>
  );
};

export default Greeting;
