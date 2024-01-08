interface DropDown {
  scrollDown: boolean;
  notification:string;
}
const NotiDropDown = (props: DropDown) => {
  return (
    <div
      className={`bg-white p-10 absolute right-[50px] top-12 border border-[rgb(240,240,240)] ${
        props.scrollDown ? "scrollDown" : "scrollUp"
      }`}
    >
      {props.notification.length>0 ? props.notification : "You don't have any current notification"}
    </div>
  );
};
export default NotiDropDown;
