const OrganizationService = require('../services/organization.service')
const { Organization } = require('../models/organization.model')

const GetAllOrganizations = async (req, res) => {
    try{
        const organizations = await OrganizationService.Find()
        return res.status(200).json({
            message: 'All organizations',
            data: organizations,
        })

    }catch(error){
        console.log('error: ', error)
    }
}

const GetOrganizationById = async (req, res) => {
    try{
        const {_id} = req.params;
        const organization = await OrganizationService.FindOne({
            _id,
        })
        return res.status(200).json({
            message: 'Organization fetched',
            data: organization,
        })

    }catch(error){
        console.log('error: ', error)
    }
}

const AddOrganization = async (req, res) => {
    try{
        const {
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture,
        } = req.body
        
        const existing_organization = await OrganizationService.FindOne({
            org_name,
        })

        if(existing_organization){
            return res.status(409).json({
                message: 'Data exists',
            });
        } 

        const new_organization = await OrganizationService.Create({
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture, 
        })

        return res.status(200).json({
            message: 'New organization created',
            data: new_organization,
        })

    }catch(error){
        console.log('error: ', error)
    }
}

const UpdateOrganization = async (req, res) => {
    try{
        const { organization_id } = req.params;
        const {
            org_name,
            org_description,
            org_country,
            org_city,
            org_picture,
        } = req.body

        const existing_organization = await OrganizationService.FindOne({
            _id : organization_id,
        })

        if(!existing_organization){
            return res.status(404).json({
                message: 'Organization not Found'
            })
        }

        const updated_organization = await OrganizationService.FindOneAndUpdate(
            { _id: organization_id },
            {
                org_name,
                org_description,
                org_country,
                org_city,
                org_picture,
            }
        );

        return res.status(200).json({
            message: 'Organization updated',
            data: updated_organization ,
        })

    }catch(error){
        console.log('error: ', error)
    }  
}

const DeleteOrganization = async (req, res) => {
    try{
        const { organization_id } = req.params;
        await OrganizationService.DeleteOne({_id: organization_id})
        return res.status(200).json({
            message: 'Organization Deleted',
        })

    }catch(error){
        console.log('error: ', error)
    }
}

module.exports = {
    GetAllOrganizations,
    GetOrganizationById,
    AddOrganization,
    UpdateOrganization,
    DeleteOrganization,
}