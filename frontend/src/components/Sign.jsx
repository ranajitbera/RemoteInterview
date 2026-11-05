import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const Sign = () => {
  return (
    <>
      <header>

        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  );
};

export default Sign;
