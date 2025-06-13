import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { tools, getAllCategories, getToolsByCategory } from "@/data/tools";

export default function Tools() {
  const categories = getAllCategories();

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="text-primary">Toolkit</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Essential tools I use to deliver professional virtual assistance services
          </p>
        </motion.div>

        <div className="space-y-12 sm:space-y-16">
          {categories.map((category, categoryIndex) => {
            const categoryTools = getToolsByCategory(category);
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="space-y-6"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-center text-foreground">{category}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                  {categoryTools.map((tool, index) => {
                    const IconComponent = tool.icon;
                    return (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (index * 0.03) }}
                      >
                        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                          <CardContent className="p-4 sm:p-6 text-center">
                            <div className="mb-3 sm:mb-4 flex justify-center">
                              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                                <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                              </div>
                            </div>
                            <h3 className="font-medium text-xs sm:text-sm leading-tight text-foreground line-clamp-2">{tool.name}</h3>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 sm:mt-20"
        >
          <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-foreground">
              Need help with any of these tools?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              I'm proficient in all these platforms and ready to help streamline your business operations.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
