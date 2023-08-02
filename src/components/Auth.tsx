import { useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { Button } from "./ui/button";
import { authZod } from "@/utils/authZod";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "./ui/separator";
interface AuthProps {
  isSignUp: boolean;
}
type FormValues = {
  password: string;
  email: string;
};
const Auth = ({ isSignUp }: AuthProps) => {
  const db = getDatabase();
  const navigate = useNavigate();
  const dbRef = ref(db);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const form = useForm({
    resolver: zodResolver(authZod),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const { control } = form;
  const [authError, setAuthError] = useState<string>("");
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // console.log(user, "user");
        get(child(dbRef, `users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              navigate("/playground");
            } else {
              set(ref(db, "users/" + user.uid), {
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                displayName: user.displayName,
                uid: user.uid,
                email: user.email,
              });

              navigate("/playground");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.log("failed to login", error);
      });
  };

  const LoginWithEmailAndPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        get(child(dbRef, `users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              navigate("/playground");
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            setAuthError(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          setAuthError("Wrong Password");
        } else if (errorCode === "auth/user-not-found") {
          setAuthError("User not found. Please register!");
        } else setAuthError(errorMessage);
        // ..
      });
  };
  const SignUpWithEmailAndPassword = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        set(ref(db, "users/" + user.uid), {
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
        });

        navigate("/playground");
      })
      .catch((error: Error) => {
        const errorMessage = error.message;
        setAuthError(errorMessage);
        // ..
      });
  };
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // console.log(data, "data");
    if (isSignUp) {
      SignUpWithEmailAndPassword(data.email, data.password);
    } else {
      LoginWithEmailAndPassword(data.email, data.password);
    }
  };
  return (
    <Card className=" my-8 p-12 mx-auto lg:w-[800px] lg:h-[550px] ">
      {
        <div className="flex flex-col justify-center gap-4">
          <CardTitle className="text-center">
            {`${isSignUp ? "Sign Up" : "Login"} `}
          </CardTitle>

          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="w-[full]">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email:</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[full]">
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password:</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">{`${
                isSignUp ? "Sign up" : "Log in"
              } with Email and Password`}</Button>
            </form>
          </Form>
          {authError && <p className="text-center text-red-500">{authError}</p>}
          <p className="text-xl font-bold text-center">OR</p>
          <Separator />
          <Button variant={"outline"} onClick={signInWithGoogle}>{`Sign ${
            isSignUp ? "up" : "in"
          } with Google`}</Button>
          <div className="flex justify-center gap-2">
            {isSignUp ? (
              <>
                <p className="font-semibold text-center">Existing User?</p>
                <a
                  className="underline"
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  Login
                </a>
              </>
            ) : (
              <>
                <p className="font-semibold text-center">New user?</p>
                <a
                  className="underline"
                  href="/register"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/register");
                  }}
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      }
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </Card>
  );
};

export default Auth;
