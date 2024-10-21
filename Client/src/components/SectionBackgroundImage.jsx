import React from "react";
const SectionBackgroundImage = ({ src, children, style}) =>{
    const defaultStyle ={
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh', // Adjust the height based on your needs
        width: '100%',
        position: 'relative',
        ...style, // Merge with additional styles passed via props
    }
    return (
<section className="py-20 px-16 " style={{ ...defaultStyle, ...style}}>
    <div className=""
    style={{
        backgroundColor: 'rgba(255, 103, 103, 0.7)', // Use rgba for transparency
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
      }} />
    <div className="" style={{ position: 'relative', zIndex: 2, }}>
    {children}
    </div>
    
</section>
    );
};

export default SectionBackgroundImage;
