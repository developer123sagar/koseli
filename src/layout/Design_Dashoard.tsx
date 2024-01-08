import Content_Dashboard from "./Content_Dashboard";

export default function Dashboard_Layout({
  children,
  button,
  buttonText,
  btnPath,
  isDeleteBtn = true,
  deleteBtn,
  onClick,
}: {
  children: React.ReactNode;
  button?: boolean;
  buttonText?: string;
  btnPath?: string;
  deleteBtn?: string;
  onClick?: () => void;
  isDeleteBtn?: boolean;
}) {
  return (
    <>
      <Content_Dashboard
        deleteBtn={deleteBtn}
        button={button || false}
        buttonText={buttonText}
        btnPath={btnPath}
        onClick={onClick}
        isDeleteBtn={isDeleteBtn}
      />
      <div className="w-full h-screen scrollbar-hide">{children}</div>
    </>
  );
}
