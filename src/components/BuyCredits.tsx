import SellingPoint from "./SellingPoint";

const BuyCredits = () => {
  return (
    <section className="container py-8 space-y-6 js-show-on-scroll dark:bg-transparent md:py-12 lg:py-24bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Designed to provide you maximum value without having to break the
            bank.
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl ">
            Here at StyleSwap we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
            <p className="font-light text-gray-500 sm:text-lg ">
              Best option for personal use & for your next project.
            </p>
            <div className="flex items-baseline justify-center my-8">
              <span className="mr-2 text-5xl font-extrabold">$5</span>
              <span className="text-gray-500 ">/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <SellingPoint sellingPoint="100 free image transformations" />
              <SellingPoint sellingPoint="No setup, or hidden fees" />
            </ul>
            <a
              href="#"
              className="text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-primary-900"
            >
              Get started
            </a>
          </div>
          <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 className="mb-4 text-2xl font-semibold">Company</h3>
            <p className="font-light text-gray-500 sm:text-lg ">
              Relevant for multiple users, extended & premium support.
            </p>
            <div className="flex items-baseline justify-center my-8">
              <span className="mr-2 text-5xl font-extrabold">$10</span>
              <span className="text-gray-500 ">/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <SellingPoint sellingPoint="250 free image transformations" />
              <SellingPoint sellingPoint="No setup, or hidden fees" />
            </ul>
            <a
              href="#"
              className="text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-primary-900"
            >
              Get started
            </a>
          </div>
          <div className="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
            <p className="font-light text-gray-500 sm:text-lg ">
              Best for large scale uses and extended redistribution rights.
            </p>
            <div className="flex items-baseline justify-center my-8">
              <span className="mr-2 text-5xl font-extrabold">$15</span>
              <span className="text-gray-500 ">/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <SellingPoint sellingPoint="400 free image transformations" />
              <SellingPoint sellingPoint="No setup, or hidden fees" />
            </ul>
            <a
              href="#"
              className="text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-primary-900"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyCredits;
