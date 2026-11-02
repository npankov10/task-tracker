type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return <h1 className="text-lg font-bold">{title}</h1>;
};
