package com.bupbhrms.simInfo

import android.content.Context
import android.telephony.TelephonyManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class SimInfoModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val context: Context = reactContext

    override fun getName(): String {
        return "SimInfo"
    }

    @ReactMethod
    fun getSimInfo(promise: Promise) {
        try {
            val telephonyManager = context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
            val simOperatorName = telephonyManager.simOperatorName
            val simCountryIso = telephonyManager.simCountryIso
            val simSerialNumber = telephonyManager.simSerialNumber

            val simInfo = mapOf(
                "operatorName" to simOperatorName,
                "countryIso" to simCountryIso,
                "serialNumber" to simSerialNumber
            )

            promise.resolve(simInfo)
        } catch (e: Exception) {
            promise.reject("SIM_INFO_ERROR", e.message, e)
        }
    }
}
