export const CalendarEventBox = ({ event }: any) => {
  const { title, user } = event;
  return (
    <>
      <strong>{title}</strong>
      <p>{user.name}</p>
    </>
  );
};
