// components/about/WhoWeAre.tsx
export default function WhoWeAre() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-12">

        {/* TITLE */}
        <h1 className="text-3xl lg:text-5xl font-bold mb-10">
          Who We Are
        </h1>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* TEXT BLOCK */}
          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-justify">
              SPX is an Africa-led development institution committed to designing 
              and delivering practical solutions that strengthen livelihoods, 
              accelerate economic opportunity, and build resilient systems 
              across the continent. The organization brings together strategy, 
              research, field implementation, and innovation within one integrated 
              model—allowing ideas to move seamlessly from insight to execution 
              and scale.
            </p>

            <p className="text-justify">
              Grounded in Ethiopia and shaped by African leadership and contextual 
              expertise, SPX operates across sectors that define the region’s 
              future: energy-enabled development, agriculture and food systems, 
              digital transformation, climate resilience, skills and employment, 
              and applied innovation.
            </p>

            <p className="text-justify">
              SPX works confidently in both policy-level advisory and field-level 
              delivery, combining multidisciplinary technical skills with 
              substantial operational capability. The firm’s approach is informed 
              by a deep understanding of African markets, community realities, 
              institutional dynamics, and long-term system pathways.
            </p>
          </div>
          
          {/* IMAGE AND LOOKING AHEAD */}
          <div className="flex flex-col items-center">
            {/* IMAGE PLACEHOLDER */}
          <div className="w-full h-[420px] bg-muted rounded-xl shadow-lg flex items-center justify-center">
            <span className="text-muted-foreground">
              Image Placeholder (Team / Field Work / Africa Map)
            </span>
          </div>
           {/* Looking Ahead */}
            <div className="border-l-4 pl-4 border-primary mt-6">
              <h3 className="text-xl font-semibold mb-2">Looking Ahead</h3>
              <p  className="text-justify">
                SPX is committed to contributing to Africa’s next generation of 
                development institutions—locally grounded, technically rigorous, 
                operationally capable, and future-oriented. The organization 
                continues to expand its work across energy, agriculture, 
                employment, digital transformation, and climate resilience, 
                partnering with organizations that share the vision of a more 
                inclusive and sustainable Africa.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
