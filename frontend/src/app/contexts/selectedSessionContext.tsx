import { createContext, useState } from "react";
import { fetchSession } from "../../services/modelService";
export interface SelectedSessionProviderValue {
  selectedSessionId: number | undefined;
  setSelectedSessionId: (sessionId: number | undefined) => unknown;
}
// eslint-disable-next-line react-refresh/only-export-components
export const SelectedSessionContext = createContext({
  selectedSessionId: undefined,
  setSelectedSessionId: () => {},
} as unknown as SelectedSessionProviderValue);

const SelectedSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedSessionId, setSelectedSessionId] = useState<
    number | undefined
  >(undefined);

  const setSelectedSessionIdHandler = (newId: number | undefined) => {
    if (newId == undefined) {
      setSelectedSessionId(undefined);
    } else {
      fetchSession(newId).then((session) => {
        setSelectedSessionId(session.id);
      });
    }
  };

  return (
    <SelectedSessionContext.Provider
      value={{
        selectedSessionId,
        setSelectedSessionId: setSelectedSessionIdHandler,
      }}
    >
      {children}
    </SelectedSessionContext.Provider>
  );
};

export default SelectedSessionProvider;
