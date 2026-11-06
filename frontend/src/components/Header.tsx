type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return <h1 className="text-xl font-bold">{title}</h1>;
};
