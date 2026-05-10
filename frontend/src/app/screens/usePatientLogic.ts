import { useContext, useEffect } from "react";
import { SessionContext } from "../contexts/sessionContext";
import { useCookies } from "react-cookie";

const usePatient = () => {
  const { therapistId, setTherapistId } = useContext(SessionContext);
  const [cookies, setCookie, removeCookie] = useCookies(["therapy"]);

  useEffect(() => {
    const therapyCookie = cookies.therapy;
    if (!therapyCookie) return;

    let therapistIdFromCookie: number | undefined;

    if (typeof therapyCookie === "string") {
      try {
        const parsed = JSON.parse(therapyCookie);
        if (typeof parsed?.therapist_id === "number") {
          therapistIdFromCookie = parsed.therapist_id;
        }
      } catch {
        if (/^\d+$/.test(therapyCookie)) {
          therapistIdFromCookie = Number(therapyCookie);
        }
      }
    } else if (typeof therapyCookie === "object" && therapyCookie !== null) {
      if (typeof therapyCookie.therapist_id === "number") {
        therapistIdFromCookie = therapyCookie.therapist_id;
      } else if (typeof therapyCookie.id === "number") {
        therapistIdFromCookie = therapyCookie.id;
      }
    }

    if (typeof therapistIdFromCookie === "number") {
      setTherapistId(therapistIdFromCookie);
    }
  }, [cookies, setTherapistId]);

  useEffect(() => {
    if (typeof therapistId === "number") {
      setCookie("therapy", JSON.stringify({ therapist_id: therapistId }), {
        path: "/",
      });
    } else {
      removeCookie("therapy", { path: "/" });
    }
  }, [therapistId, removeCookie, setCookie]);

  return { cookies };
};

export default usePatient;
