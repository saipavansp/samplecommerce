export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About Perfect Score Technologies</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Perfect Score Technologies has been at the forefront of industrial glass processing equipment manufacturing since 1995. 
              With over 25 years of experience, we have established ourselves as a trusted partner for businesses worldwide.
            </p>
            <p className="text-gray-700">
              Our journey began with a simple vision: to provide cutting-edge technology that makes glass processing more efficient, 
              precise, and cost-effective. Today, we serve over 5,000 customers across 50 countries.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              To deliver innovative, reliable, and high-performance glass processing solutions that empower our customers to achieve 
              excellence in their operations while maintaining the highest standards of quality and sustainability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Industry Experience</h3>
                <p className="text-gray-600">Over 25 years of expertise in glass processing technology</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Global Reach</h3>
                <p className="text-gray-600">Serving customers in over 50 countries worldwide</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
                <p className="text-gray-600">ISO 9001:2015 certified manufacturing processes</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock technical support and maintenance</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Innovation: Continuously improving our technology</li>
              <li>Quality: Never compromising on product standards</li>
              <li>Integrity: Building trust through transparent business practices</li>
              <li>Sustainability: Committed to environmentally responsible manufacturing</li>
              <li>Customer Focus: Your success is our priority</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
