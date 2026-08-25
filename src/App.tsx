<AnimatePresence mode="wait">
                  {page3SubTab === "directory" ? (
                    <motion.div
                      key="directory-subview"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <FindLawyerSection
                        language={language}
                        onAppointmentBooked={handleAppointmentBooked}
                        presetCategory={presetLawyerCategory}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="faqs-subview"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <FAQSection language={language} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* PAGE 4: EMERGENCY HELPLINES DIRECTORY                                   */}
          {/* ========================================================================= */}
          {currentTab === "emergency" && (
            <motion.div
              key="emergency-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <EmergencyContactsSection language={language} />
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* PAGE 5: USER DASHBOARDS (Saved Articles & Appointments)                   */}
          {/* ========================================================================= */}
          {currentTab === "dashboards" && (
            <motion.div
              key="dashboards-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Dashboards
                language={language}
                savedArticleIds={savedArticleIds}
                toggleSaveArticle={toggleSaveArticle}
                appointments={appointments}
                onCancelAppointment={handleCancelAppointment}
                setCurrentTab={navigateToTab}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Application Footer */}
      <Footer language={language} setCurrentTab={navigateToTab} />

      {/* Global Interactive Modals & Floating Widgets */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        language={language}
        openLawyerBookingWithCategory={handleOpenLawyerWithCategory}
      />

      <SearchLawsModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        language={language}
        setCurrentTab={navigateToTab}
      />

      {/* Floating Emergency SOS Button */}
      <FloatingEmergency
        onClick={() => {
          setCurrentTab("emergency");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
