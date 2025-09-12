/*
The routing system starts from app folder and there are some reserved file names 
that mean some things like : 

1- page.tsx ===> is to define the starting point of each route . 
2- layout.tsx ===> is to define the file that wraps the page.tsx file so a container or a wrapper.
3- not-found.tsx ==> is to define "not found" fallback page .
4- error.tsx ===> is to define "Error" fallback page .
5- loading.tsx ===> is to define "Loading" fallback page .



ROUTING : 

1- Any folder we put in the app folder eventfully would become a route 
    like to say : 
        📂app:
            📂test:
                page.tsx (this file and the export default component in it is important to have the route)
    Now the route would be like => 🔗https://www.yourDomain.com/test         
    
2- If we want to have a nested route we can do it by creating a folder inside the folder 
    like to say :
        📂app:
            📂test:
                📂nested:
                    page.tsx (this file and the export default component in it is important to have the route)
    Now the route would be like => 🔗https://www.yourDomain.com/test/nested
    
3- If we want to have a dynamic route we can do it by creating a folder with the name between []
    like to say :
        📂app:
            📂test:
                📂[id]:
                    page.tsx (this file and the export default component in it is important to have the route)
    Now the route would be like => 🔗https://www.yourDomain.com/test/1
    or 🔗https://www.yourDomain.com/test/anyStringValue    

4- If we want to have a catch all route we can do it by creating a folder with the name between [[...]]
    like to say :
        📂app:
            📂test:
                📂[[...id]]:
                    page.tsx (this file and the export default component in it is important to have the route)
    Now the route would be like => 🔗https://www.yourDomain.com/test/1

5-There is a path way called Parallel Routes which we can define a folder route in app folder then in it we can have 
    a layout.tsx file and then next to this we can have any many as we want parallel routes defined like this : 
    📂app:
        📂test:
            layout.tsx
            📂@parallel1:
                page.tsx
            📂@parallel2:
                page.tsx
            📂@parallel3:
                page.tsx

    which @ is important to be there and also in the layout.tsx file not only we get children as the the prop for its 
    component but also we get the names of the parallel routes that indicates each content or to be more precise the 
    component coming from their page.tsx file like below :

    export default function testLayout({ parallel1 , parallel2 , parallel3 , children }){
        return (
        <>
            <div>{parallel1}</div>
            <div>{parallel2}</div>
            <div>{parallel3}</div>
            <div>{children}</div>
        <>
        )
    }

    that's how they work . now in one route I'm showing several routes . 

    there is an important point to notice here for example if the parallel route has a nested route
    or a nested dynamic route or what ever kind of nested route the the other brothers of it should have the
    same behavior in terms of rendering and layout structure.
    but to avoid that we can have default.tsx file which would handle if does not get that route 
    even sometimes we can use this instead of page.tsx file and just have this default.tsx file .


6- interceptor route in next.js is a special kind of route that allows us to intercept and modify the request/response cycle.
    it can be useful for things like authentication, logging, or modifying the response before it reaches the client.
    to create an interceptor route we can create a folder with the name of (..) like below :
    📂app:
        📂test:
            📂(.)image:
                page.tsx (this file and the export default component in it is important to have the route)
                layout.tsx (this file is optional and can be used to define a layout for the route)
             📂image:


7- group routing : is a way to group related routes together under a common parent route. This can be useful for organizing your routes and making them easier to manage.
    to create a group route we can create a folder with the name of (group) like below :
    📂app:
        📂test:
            📂(group):
                📂image:
                    page.tsx (this file and the export default component in it is important to have the route)
                    layout.tsx (this file is optional and can be used to define a layout for the route)
                📂video:
                    page.tsx (this file and the export default component in it is important to have the route)
                    layout.tsx (this file is optional and can be used to define a layout for the route)


8- Route handlers : are special functions that handle incoming requests to a specific route. They can be used to perform actions such as fetching   data, processing form submissions, or returning a response to the client. In Next.js, we can create a route handler by defining a function in the page.tsx file like below :

    export async function GET(request: Request) {
        const data = await fetchData();
        return NextResponse.json(data);
    }

    this would work to have a folder route and then like below we can have a reserved name route.js
    in this file we can define GET or POST or DELETE or PUT or PATCH functions like above .
    this is mostly for creating the api routes.




9- middleware.js which is a reserved name can be created next to package.json file and it's used to 

    like this : 
    import {NextResponse} from next/server;
    export function middleware(request){
        console.log(request);
        return NextResponse.next();
    }
    it can be used for things like authentication, logging, or modifying the response before it reaches the client.
    it runs this code before the request is processed by the route handler.
    for every kind of requests .

    export const config = {
        matcher: ['/api/:path*', '/dashboard/:path*'],
        or
        matcher: '/news',
    }
    this would ensure that the middleware runs only for the specified routes.
    this should be called config . 



POINTS : 

1- All the components would get rendered on the server side if and only we say not to . 

2- For image once loading we should use imported Image with a .src that is a static string or imported
    like to say :
    import myImage from "path/to/image"
    <Image src={myImage.src} alt="my image" />
    
3- For fonts we can use next/font/google or next/font/local to import fonts and use them in the project
    like to say :
    import { Geist, Geist_Mono } from "next/font/google";
    const geistSans = Geist({
      variable: "--font-geist-sans",
      subsets: ["latin"],
    });
    const geistMono = Geist_Mono({
      variable: "--font-geist-mono",
      subsets: ["latin"],
    });
    and then use them in the layout.tsx file like to say :
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    </body>
    and then use the css variable in the globals.css file like to say :
    body {
      font-family: var(--font-geist-sans);
    }

4- For css we can use module.css or globals.css or any css framework like tailwindcss , bootstrap ,...etc

5- For Client side rendering we can use "use client" directive at the top of the file
    like to say :
    "use client"
    import { useState } from "react";
    export default function Counter() {
      const [count, setCount] = useState(0);
      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
    }
    and then this component would be rendered on the client side only .

6- For SSR (Server Side Rendering) , the next.js does it by default for all the components
    unless we use "use client" directive at the top of the file .


7- We should have this in mind that we should go for using 'use client' as less as possible
    or to use them just in the parts that are needed for example making separate small components
    for those which need client side rendering.

8- For writing paths it's recommended to always use completed paths instead of relative paths even if 
    we are in a sub-route . 


9- Since inheritance for reserved files are supported in next.js so we can create a loading.tsx
    file in a parent directory and it will be applied to all child routes automatically it also 
    applies to all these kinda files.


10- About the 'use server' and 'use client' file we can import each of the files in each-other 
    but using both at the same time in one file would cause an error . 


11- To prepare a next project for production we should run this command : 
    npm run build then with this there is a heavily big caching from next.js 
    performed so for the pages that need revalidation or refetching data 
    we need to do the below actions : 
    there is a function called revalidatePath() which takes two params
    the first is the path and the second the the level of revalidation
    so we can for example use it like these : 
    revalidatePath('/meals','page') it will revalidate only this path     
    revalidatePath('/meals','layout') this is not only going to revalidate the given path but also all the nested routes of /meals as well     
    revalidatePath('/','layout') this would revalidate the whole app   
    and to point out that the default value of second param is 'page' . 

COMPONENTS: 

1- <Link>
    example :
    import Link from "next/link";
    <Link href={"/awsome"}>Go to Awsome Page</Link>

2- <Image>
    example :
    import Image from "next/image";
    import myImage from "path/to/image"
    <Image src={myImage} alt="my image" width={500} height={500} />
    You can use the "fill" prop instead of setting a "width" and "height"
    whenever you have an image where you don't know the
    dimensions in advance.
    also we have something as priority which can be used to load important images first.



FUNCTIONS or VARIABLES or HOOKS: 

1- metadata : is a reserved variable to define the metadata of the page like title , description ,...etc
    like to say :
    export const metadata: Metadata = {
       title: "Create Next App",
       description: "Generated by create next app",
    };
    Or if the page is a dynamic page with dynamic data we can use this function which is a reserved name : 
    export async function generateMetadata({params}){
    const myData = whatEverFunctionFromServer();
    return {
        title:myData.title;
        description:myData.summary;
    }
    }

2- params : is a reserved variable to get the params from the url in dynamic routes
    like to say :
    export default function Page({ params }: { params: { id: string } }) {
       return <div>Dynamic Route with id: {params.id}</div>;
    }  
    the id here is the name of the folder that we created with [] in the app folder     

3- usePathname() : is to get the current pathname of the url
    like to say :
    const pathname = usePathname();
    and in here we can use this to determine that what navLink is active or not.
    like this :
    import Link from 'next/link';
    import { usePathname } from 'next/navigation';
    import classes from './nav-link.module.css';

    export default function NavLink({ href, children }) {
        const path = usePathname();

        return (
          <Link
            href={href}
            className={path.startsWith(href) ? classes.active : undefined}
          >
            {children}
          </Link>
        );
      }

4- notFound() : is to define and stop the component from running and then it gets into the 404 page file . 
    that goes by the name of not-found.tsx white this function gets imported from "next/navigation"
    and looks for the closest not-found.tsx file in the directory structure to render the 404 page.

5- useFormStatus() : is a component that gives us the status of the form being said in its name which
    gets imported from 'react-dom'.

6- useFormState() : is something that can be worked around the actions and between the forms 
    like to say we can have this like this : 
    
    const [state , formAction] = useFormState(theNameOfTheActionFunction,defaultValueShapeWhichMostlyIsNull)
    then in the action of the form we pass formAction to it . 

    then state has access to the value returned by the action function from server . 

    now to my server function action we should add another param called prevState as the first param.


7-useRouter() : is a hook that gives us access to the router object which contains information about the current route and allows us to programmatically navigate between routes.
    like to say :
    const router = useRouter();
    router.push('/new-route');
    this will navigate the user to the new route.
    or 
    router.back()
    this will navigate the user back to the previous route.



 8- another parameter that is automatically passed to the components in next.js 
    is searchParams which is used to get the query params from the url
    and it can be used like this :
    export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
       return <div>Query Param: {searchParams.id}</div>;
    }  
    the id here is the name of the query param that we want to get from the url 
    like to say : https://www.yourDomain.com/test?id=1   


ACTIONS : 

1- by adding 'use server'; in an async function we make that a server function which can be run 
    straitly on the BE side then that function gets a param called formData which we can 
    extract the data that was sent by that form that we set the action attribute of it to the name of 
    that server function like to say: 
        const name = formData.get('name')
    the value we pass to the get function here is what we have passed as the name attribute of 
    the input tag . 



DATA FETCHING IN NEXT.JS : 

    while doing fetching the data should have the component async .
    so instead of having the fetch function in a useEffect we can have 
    it and call it directly in the main component and also the next.js 
    would add some other features to that fetch and also some caching 
    things to it. 

    but since we are on the BE side if we have access to the data source 
    we can have the access strait from the data base . 



1- server actions : are functions that can be run on the server side and can access the server environment directly. 
   they are defined using the 'use server' directive at the top of the function. 
   these actions can be used to handle form submissions, fetch data from a database, or perform any other server-side logic.
   for example:
   'use server';
   async function myServerAction(formData) {
       const name = formData.get('name');
       // do something with the name
   }
    then in the form tag we can set the action attribute to this function name like to say :
        <form action={myServerAction}>
            <input type="text" name="name" />
            <button type="submit">Submit</button>
        </form>
    also to mention that if we do not use 'use server' we have a client side action which means that the function will be executed on the client side and will not have access to the server environment.

    also if we want to have the server function something passed to it we can have it like this :
    <form action={myServerAction.bind(null,ourParam)}>
        <input type="text" name="name" />
        <input type="text" name="age" />
        <button type="submit">Submit</button>
    </form>

    export async function myServerAction(ourParam, formData) {
        const name = formData.get('name');
        const age = formData.get('age');
        // do something with the name and age
    }

    now about revalidating we can use revalidatePath function which allows us to revalidate the data for a specific path and ensure that the latest data is fetched from the server. This can be useful in scenarios where we want to refresh the data displayed in a component without having to reload the entire page.

    for example:
    'use server';
    async function myServerAction(formData) {
        const name = formData.get('name');
        // do something with the name
        revalidatePath('/some/path');
    }

    in here we can use a hook called useOptimistic() which works like this :
    const [isOptimistic, setIsOptimistic] = useOptimistic(first,second);
    first : is the data we wanna fetch 
    second : is a function that changes the data on the client side until the 
    actual data got fetched .

    for example : 

    const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts , updatedPostId) => {
        const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId);
        if(updatedPostIndex === -1){
            return prevPosts;
        }
        const updatedPost = {...prevPosts[updatedPostIndex]};
        updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1)
        updatedPost.isLiked = !updatedPost.isLiked;
        const newPosts = [...prevPosts]
        newPosts[updatedPostIndex] = updatedPost;
        return newPosts;
    });

    and then at last we just need to have updateOptimisticPosts function called with post's ID .



2- for graphql we can have : 

                // lib/graphql.ts
            export async function fetchGraphQL<TData = any>(
            query: string,
            variables?: Record<string, any>,
            options?: RequestInit
            ): Promise<TData> {
            const res = await fetch(process.env.GRAPHQL_ENDPOINT as string, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`, // optional
                },
                body: JSON.stringify({ query, variables }),
                // 👇 Next.js fetch options for caching
                cache: "no-store", // or "force-cache" | "no-store" | "reload"
                ...options,
            });

            const json = await res.json();

            if (json.errors) {
                throw new Error(JSON.stringify(json.errors));
            }

            return json.data;
            }

and this is how to use it : 
        // app/page.tsx
            import { fetchGraphQL } from "@/lib/graphql";

            const GET_PRODUCTS = `
            query Products($limit: Int) {
                products(limit: $limit) {
                id
                name
                price
                }
            }
            `;

            export default async function Page() {
            const data = await fetchGraphQL<{ products: { id: string; name: string; price: number }[] }>(
                GET_PRODUCTS,
                { limit: 5 },
                { next: { revalidate: 60 } } // ISR: revalidates every 60s
            );





    
CACHING  IN NEXT.JS : 

1- Request Memoization : 
    NextJS stores data requests with the same configuration
    This avoids unnecessary duplicate data fetches
    Cache only persists during request duration

2- Data Cache : 
    NextJS stores & reuses fetched data until it’s revalidated
    This avoids unnecessary requests to the data source & speeds up the application
    The cache persists until it’s revalidated (manually or after a set time)

3- Full Route Cache :
    NextJS stores the rendered HTML & RSC at build time
    This avoids unnecessary HTML render cycles & data fetches
    The cache persists until the related data cache is revalidated

4- Router Cache :
    NextJS stores the RSC payload in memory in the browser
    This ensures extremely fast page transitions since no server request is needed


5- first of all fetch function has been developed so much in next.js that we do not think 
    we're not going to be needing tanstack or apollo client for it . 

    for revalidation of the data cache we can have some ways like below : 

    export const revalidate = seconds ; this is a reserved name 

    const response = await fetch('https://wwww.google.com',{
        cache : 'default' or 'no-store' .... the default is : 'force-cache'
        or 
        next :{
            revalidate : seconds. to revalidate the data .
        }
    })


    or 

    export const dynamic = 'auto' is the default and we can put it like : 'force-dynamic' to revalidate what ever 
    is in that file and this is a reserved name . 

    or another way of doing this is an import from next/cache ;

    import { unstable_noStore } from 'next/cache';
    or might the name be just noStore
    and just calling this function at the beginning of the component 
    then we're goog to go . 


    besides the revalidatePath() function we have another function we can use just to revalidate 
    a specific fetch it's called revalidateTag('JustATag')
    then we can use it there 

    const response = await fetch('https://wwww.google.com',{
        next :{
            tag:['JustATag']
        }
    })

    another one situation is that when we use the database straitly so we can use a function from react itself 
    like below : 

    import { cache } from 'react';

    export const getMessages = cache(
    function getMessages(){
    return db.prepare('SELECT * FROM messages').all()
    }
    )

    besides cache function from react we have a function just like that and works like that called 
    unstable_cache from 'next/cache' ;

AUTHENTICATION IN NEXT.JS :




*/
