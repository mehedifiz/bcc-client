const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-4 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} BCC Client. All rights reserved.</p>
        <p className="text-sm">Developed by Your Name</p>
      </div>
    </div>
  );
};

export default Footer;
