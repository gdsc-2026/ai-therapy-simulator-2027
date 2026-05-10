import { createContext, useState } from "react";
import type { TherapySession } from "../../types/models";
import { fetchSessions } from "../../services/modelService";
export interface SessionProviderValues {
  sessions: TherapySession[];
  therapistId: number | undefined;
  setTherapistId: (id: number) => unknown;
}
// eslint-disable-next-line react-refresh/only-export-components
export const SessionContext = createContext({
  sessions: [],
  theraptistId: undefined,
  setTherapistId: () => {},
} as unknown as SessionProviderValues);

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sessions, setSessions] = useState<TherapySession[]>([]);
  const [therapistId, setTherapistId] = useState<number | undefined>(undefined);
  const setTherapistIdHandle = (newId: number) => {
    console.log("set therapist id to", newId);
    fetchSessions(newId).then((sessions) => {
      setSessions(sessions);
      setTherapistId(newId);
    });
  };
  return (
    <SessionContext.Provider
      value={{ sessions, therapistId, setTherapistId: setTherapistIdHandle }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
