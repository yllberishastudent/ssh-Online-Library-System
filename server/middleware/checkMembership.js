const Membership = require("../models/Membership");

async function checkMembershipExpiry() {
  try {
    const memberships = await Membership.findAll({
      where: {
        isActive: true,
      },
    });

    const currentDate = new Date().toISOString().slice(0, 10);

    for (const membership of memberships) {
      const expiryDate = membership.expiryDate.toISOString().slice(0, 10);

      if (currentDate > expiryDate) {
        await membership.update({ isActive: false });
        console.log(
          `Membership ${membership.id} expired. isActive updated to false.`
        );
      }
    }
  } catch (error) {
    console.error("Error checking membership expiry:", error);
  }
}

module.exports = checkMembershipExpiry;
