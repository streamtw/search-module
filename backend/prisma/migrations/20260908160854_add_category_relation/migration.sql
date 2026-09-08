-- AlterTable
ALTER TABLE `CharityOrganization` ADD COLUMN `donation_category_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `CharityProduct` ADD COLUMN `donation_category_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `DonationProject` ADD COLUMN `donation_category_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CharityOrganization` ADD CONSTRAINT `CharityOrganization_donation_category_id_fkey` FOREIGN KEY (`donation_category_id`) REFERENCES `DonationCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonationProject` ADD CONSTRAINT `DonationProject_donation_category_id_fkey` FOREIGN KEY (`donation_category_id`) REFERENCES `DonationCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharityProduct` ADD CONSTRAINT `CharityProduct_donation_category_id_fkey` FOREIGN KEY (`donation_category_id`) REFERENCES `DonationCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
