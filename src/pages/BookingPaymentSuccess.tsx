import HeaderNoLocation from "./HeaderNoLocation";
import { useParams } from "react-router-dom";
const BookingPaymentSuccess = () => {
  const { status } = useParams();

  status;

  return (
    <>
      <HeaderNoLocation />
      <div className="text-center mt-30">
        <h5> Your restaurant table has been booked sucesfully !</h5>
      </div>
    </>
  );
};

export default BookingPaymentSuccess;
