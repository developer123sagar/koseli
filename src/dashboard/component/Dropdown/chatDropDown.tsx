interface DropDown {
  scrollDown: boolean;
}
const ChatDropDown = (props: DropDown) => {
  return (
    <div
      className={`bg-white p-10 absolute top-12 border border-[rgb(240,240,240)] ${
        props.scrollDown ? "scrollDown" : "scrollUp"
      }`}
    >
      This is chat panel
    </div>
  );
};
export default ChatDropDown;
