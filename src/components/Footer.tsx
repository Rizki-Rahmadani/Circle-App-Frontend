import { Card, Heading, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Card.Root size="sm" my={5}>
      <Card.Header className="flex flex-row">
        <Heading size="sm" textStyle={'sm'}>
          Developer by{' '}
          <span className="text-green-500">Rizki Rahmadani • </span>
        </Heading>
        <ul className="flex gap-1">
          <li>
            <Link>
              <img src="../src/assets/instagram.png" alt="" width={20} />
            </Link>
          </li>
          <li>
            <Link>
              <img src="../src/assets/facebook-white.png" alt="" width={20} />
            </Link>
          </li>
          <li>
            <Link>
              <img src="../src/assets/linkedin-white.png" alt="" width={20} />
            </Link>
          </li>
        </ul>
      </Card.Header>
      <Card.Body
        color="fg.muted"
        className="flex flex-row items-center text-xs gap-1"
      >
        <Text className="gap-1">Powered by</Text>
        <img src="../src/assets/dumbways.png" alt="" width={20} />
        <Text>Dumbways Indonesia • #1CodingBootcamp</Text>
      </Card.Body>
    </Card.Root>
  );
};

export default Footer;
