const Footer = () => {
  return (
    <footer className="center-container bottom-0 bg-gray-600 !w-full">
      <div className="text-center py-4 w-full">
        <p className="text-md text-white">
          &copy; {new Date().getFullYear()} SUNIB Hall. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
